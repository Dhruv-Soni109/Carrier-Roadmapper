import { nodeRequestSchema } from '../validators/node.schema.js';
import { nodeService } from '../services/node.service.js';
import { successResponse } from '../utils/response.js';

export const getNodeGuidanceHandler = async (req, res, next) => {
  try {
    const validatedData = nodeRequestSchema.parse(req.body);
    const { guidance, isMock, fromCache } = await nodeService.getNodeGuidance(validatedData);

    return successResponse(
      res,
      guidance,
      {
        isMock,
        fromCache,
        nodeId: validatedData.node.id,
      },
      200
    );
  } catch (error) {
    next(error);
  }
};
