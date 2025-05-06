import { OutputCategoryConfig } from '../types';

export const outputCategories: Record<string, OutputCategoryConfig> = {
  RecordBud: {
    id: 'RecordBud',
    name: 'RecordBud',
    description: 'basicTranscriptionAndSummary',
    options: [
      {
        id: 'transcription',
        label: 'transcription',
        description: 'convertSpeechToText',
        systemPrompt: 'Transcribe the following audio accurately, but omit filler words, stutters, and other non-verbal expressions.'
      },
      {
        id: 'blessYou',
        label: 'blessYou',
        description: 'verbatimTranscription',
        systemPrompt: 'Transcribe the following audio with absolute verbatim accuracy. Include ALL vocal expressions such as "uh", "um", "eh", stutters, coughs, sneezes, throat clearing, pauses, and any other non-verbal sounds. Use parentheses to denote non-verbal sounds like (coughs), (sneezes), (clears throat). For stutters and repetitions, transcribe them exactly as heard, e.g., "I-I-I mean" or "th-th-thank you".'
      },
      {
        id: 'multiPerson',
        label: 'multiPerson',
        description: 'speakerLabels',
        systemPrompt: 'Transcribe the following audio and format it as a conversation with speaker labels. Format each line as "Person X: [speech]" where X is the speaker number. Maintain consistent speaker numbers throughout the transcript.'
      },
      {
        id: 'summary',
        label: 'summary',
        description: 'createConciseSummary',
        systemPrompt: 'Create a concise summary of the following text, highlighting the key points and main ideas.'
      }
    ]
  },
  MeetPaper: {
    id: 'MeetPaper',
    name: 'MeetPaper',
    description: 'comprehensiveMeetingAnalysis',
    options: [
      {
        id: 'meetingNotes',
        label: 'meetingNotes',
        description: 'detailedMeetingAnalysis',
        systemPrompt: 'Analyze the following meeting transcript and extract: 1) Action items 2) Action plan 3) Key decisions 4) Deadlines. Format the output in a clear, structured way.'
      },
      {
        id: 'bulletSummary',
        label: 'bulletSummary',
        description: 'bulletPointSummary',
        systemPrompt: 'Create a bullet-point summary of the main points discussed in this meeting, focusing on clarity and brevity.'
      }
    ]
  },
  ConfBot: {
    id: 'ConfBot',
    name: 'ConfBot',
    description: 'conferenceAndPresentationAnalysis',
    options: [
      {
        id: 'speakerTakeaways',
        label: 'speakerTakeaways',
        description: 'keyPointsBySpeaker',
        systemPrompt: 'Analyze the transcript and provide key takeaways organized by speaker. For each speaker, highlight their main points and contributions.'
      },
      {
        id: 'qaHighlights',
        label: 'qaHighlights',
        description: 'importantQuestionsAndAnswers',
        systemPrompt: 'Extract and summarize the most important questions and answers from the discussion, maintaining context and clarity.'
      },
      {
        id: 'tweetableQuotes',
        label: 'tweetableQuotes',
        description: 'socialMediaQuotes',
        systemPrompt: 'Extract memorable quotes that would be suitable for social media (maximum 280 characters each). Focus on impactful and insightful statements.'
      }
    ]
  },
  MailMan: {
    id: 'MailMan',
    name: 'MailMan',
    description: 'emailCreationAssistant',
    options: [
      {
        id: 'emailDraft',
        label: 'emailDraft',
        description: 'createProfessionalEmail',
        systemPrompt: 'Convert the following content into a well-structured email draft. Tone: {tone}. Ensure proper email formatting and professional language appropriate for the selected tone.'
      }
    ]
  }
};