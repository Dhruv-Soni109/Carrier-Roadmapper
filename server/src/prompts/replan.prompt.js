/**
 * Prompt template for time-budget re-planning
 */
export const buildReplanPrompt = (params) => {
  const {
    goal,
    hoursPerWeek,
    monthsAvailable,
    availableHours,
    requiredHours,
    pendingNodes,
    completedNodeIds,
    knownNodeIds,
  } = params;

  return `You are a Technical Education Dean and Career Pacing Architect.
A user pursuing "${goal}" wants to adjust their study plan:
- Weekly Available Hours: ${hoursPerWeek} hrs/week
- Target Months: ${monthsAvailable} months
- Calculated Available Hours: ${availableHours} hours (${hoursPerWeek} * ${monthsAvailable} * 4.3)
- Total Required Curriculum Hours: ${requiredHours} hours
- Already Completed Node IDs: ${JSON.stringify(completedNodeIds)}
- Already Known Node IDs: ${JSON.stringify(knownNodeIds)}

PENDING CURRICULUM NODES:
${JSON.stringify(
  pendingNodes.map((n) => ({
    id: n.id,
    title: n.title,
    phase: n.phase,
    kind: n.kind,
    hours: n.hours,
    deps: n.deps,
    isTarget: n.isTarget,
  })),
  null,
  2
)}

STRICT REPLANNING RULES:
1. Output MUST be strictly valid, raw JSON with zero commentary.
2. NEVER mark the target-role node as a stretch task.
3. NEVER defer a prerequisite node while keeping its dependent node essential.
4. Completed and already-known nodes must remain preserved.
5. If availableHours < requiredHours, mark non-essential certifications, optional polish milestones, or secondary projects as "stretchNodeIds".
6. Do not promise that a specific timeline guarantees employment. Clearly distinguish realistic estimates from promises.
7. Return an objective feasibility explanation.

OUTPUT JSON SCHEMA:
{
  "fits": ${availableHours >= requiredHours ? 'true' : 'false'},
  "availableHours": ${availableHours},
  "requiredHours": ${requiredHours},
  "stretchNodeIds": ["id1", "id2"],
  "adjustedHours": {},
  "explanation": "Clear, encouraging explanation of how the schedule was calibrated and where to focus energy."
}`;
};
