import OpenAI from 'openai';
import {OpenAI_Key} from './constants'

const openai = new OpenAI({
  apiKey: OpenAI_Key, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true
});

export default openai;