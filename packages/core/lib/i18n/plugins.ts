import { PostProcessorModule } from 'i18next';

const SEPARATOR = '::';
const PLUGIN_NAME = 'resolveMultipleTranslation';

export const resolveMultipleTranslation: PostProcessorModule = {
  type: 'postProcessor',
  name: PLUGIN_NAME,
  process(value) {
    if (value.includes(SEPARATOR)) {
      return value.split(SEPARATOR)[1];
    }
    return value;
  }
};

export const overloadTranslationOptionHandler = (args: string[]) => {
  if (args[0]?.includes(SEPARATOR)) {
    return {
      postProcess: PLUGIN_NAME
    };
  }

  return { defaultValue: args[1] };
};
