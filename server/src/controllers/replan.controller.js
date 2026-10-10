import { replanRequestSchema } from '../validators/replan.schema.js';
import { replanService } from '../services/replan.service.js';
import { successResponse } from '../utils/response.js';

export const replanRoadmapHandler = async (req, res, next) => {
  try {
    const validatedData = replanRequestSchema.parse(req.body);
    const { plan, isMock, fromCache } = await replanService.replan(validatedData);

    return successResponse(
      res,
      plan,
      {
        isMock,
        fromCache,
        stretchCount: plan.stretchNodeIds?.length,
      },
      200
    );
  } catch (error) {
    next(error);
  }
};
