# Create clean ZIP archive for PathForge project (excluding node_modules, .git, dist, and local .env)

$workspacePath = (Get-Location).Path
$zipName = "PathForge-Career-Roadmapper.zip"
$zipDestination = Join-Path $workspacePath $zipName
$desktopPath = [System.IO.Path]::Combine([System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::UserProfile), "OneDrive", "Desktop")
if (-not (Test-Path $desktopPath)) {
    $desktopPath = [System.IO.Path]::Combine([System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::UserProfile), "Desktop")
}
$desktopZipDestination = Join-Path $desktopPath $zipName

Write-Host "Creating zip package for PathForge..." -ForegroundColor Cyan

# Remove old zip if present
if (Test-Path $zipDestination) { Remove-Item $zipDestination -Force }

$tempStage = Join-Path ([System.IO.Path]::GetTempPath()) ("PathForge_Export_" + [System.Guid]::NewGuid().ToString().Substring(0,8))
New-Item -ItemType Directory -Path $tempStage -Force | Out-Null

try {
    # Recursively copy all project files except node_modules, .git, dist, and local .env
    $items = Get-ChildItem -Path $workspacePath -Recurse | Where-Object {
        $_.FullName -notmatch '[\\/](node_modules|\.git|dist)([\\/]|$)' -and
        $_.FullName -notmatch '[\\/]\.env$' -and
        $_.Extension -ne '.zip'
    }

    foreach ($item in $items) {
        $relativePath = $item.FullName.Substring($workspacePath.Length + 1)
        $destinationPath = Join-Path $tempStage $relativePath

        if ($item.PSIsContainer) {
            if (-not (Test-Path $destinationPath)) {
                New-Item -ItemType Directory -Path $destinationPath -Force | Out-Null
            }
        } else {
            $parentFolder = Split-Path $destinationPath -Parent
            if (-not (Test-Path $parentFolder)) {
                New-Item -ItemType Directory -Path $parentFolder -Force | Out-Null
            }
            Copy-Item -Path $item.FullName -Destination $destinationPath -Force
        }
    }

    Write-Host "Compressing archive to $zipDestination..." -ForegroundColor Cyan
    Compress-Archive -Path "$tempStage\*" -DestinationPath $zipDestination -CompressionLevel Optimal -Force

    # Also copy to Desktop if available
    if (Test-Path $desktopPath) {
        Copy-Item -Path $zipDestination -Destination $desktopZipDestination -Force
        Write-Host "Also copied to Desktop: $desktopZipDestination" -ForegroundColor Green
    }

    $zipSize = (Get-Item $zipDestination).Length / 1MB
    Write-Host ("Success! Created {0} ({1:N2} MB)" -f $zipName, $zipSize) -ForegroundColor Green
}
finally {
    if (Test-Path $tempStage) {
        Remove-Item -Path $tempStage -Recurse -Force -ErrorAction SilentlyContinue
    }
}
