import { Schema, model } from 'mongoose';
import IFeedback from '@/resources/interfaces/feedback/feedback.interface';

const FeedbackSchema = new Schema<IFeedback>({
    content: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
});

export default model<IFeedback>('IFeedback', FeedbackSchema);
