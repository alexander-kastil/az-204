import { ErrorHandler, Injectable } from '@angular/core';
import { AILoggerService } from '../../logger/ai-logger.service';

@Injectable({
  providedIn: 'root',
})
export class ErrHandlerService extends ErrorHandler {
  constructor(private ai: AILoggerService) {
    super();
  }
  override handleError(error: Error) {
    // this.ai.logException(error);
  }
}
