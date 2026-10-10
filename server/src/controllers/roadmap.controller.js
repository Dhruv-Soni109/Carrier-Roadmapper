import { roadmapRequestSchema } from '../validators/roadmap.schema.js';
import { roadmapService } from '../services/roadmap.service.js';
import { successResponse } from '../utils/response.js';

export const generateRoadmapHandler = async (req, res, next) => {
  try {
    const validatedData = roadmapRequestSchema.parse(req.body);
    const { roadmap, isMock, fromCache } = await roadmapService.generateRoadmap(validatedData);

    return successResponse(
      res,
      roadmap,
      {
        isMock,
        fromCache,
        nodesCount: roadmap.nodes?.length,
        totalHours: roadmap.totalHours,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};
