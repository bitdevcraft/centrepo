import { createRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from '@repo/ui/lib/uploadthing';

export const { GET, POST } = createRouteHandler({ router: ourFileRouter });
