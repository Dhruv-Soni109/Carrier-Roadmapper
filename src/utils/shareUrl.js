import LZString from 'lz-string';

/**
 * Compresses an object into an encoded URL-safe string
 */
export const encodeRoadmapState = (state) => {
  try {
    const jsonStr = JSON.stringify(state);
    return LZString.compressToEncodedURIComponent(jsonStr);
  } catch (error) {
    console.error('Failed to encode roadmap state', error);
    return null;
  }
};

/**
 * Decompresses an encoded URL-safe string back into an object
 */
export const decodeRoadmapState = (encodedStr) => {
  try {
    if (!encodedStr) return null;
    const jsonStr = LZString.decompressFromEncodedURIComponent(encodedStr);
    if (!jsonStr) return null;
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to decode roadmap state', error);
    return null;
  }
};

/**
 * Generate full shareable URL
 */
export const getShareableUrl = (roadmapData) => {
  const minimalData = {
    id: roadmapData.id,
    goal: roadmapData.goal,
    targetCompany: roadmapData.targetCompany,
    industry: roadmapData.industry,
    weeklyHours: roadmapData.weeklyHours,
    targetMonths: roadmapData.targetMonths,
    completedNodeIds: roadmapData.completedNodeIds || [],
    knownNodeIds: roadmapData.knownNodeIds || []
  };
  const code = encodeRoadmapState(minimalData);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?roadmap=${code}`;
};
