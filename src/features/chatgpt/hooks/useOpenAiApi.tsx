import { Configuration, OpenAIApi } from "openai";

const useOpenAiApi = () => {
  const openAiApiFunc = (newQuestion: string) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const configuration = new Configuration({
      apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);
    const generateResponse = async () => {
      let options = {
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["/"],
      };

      let completeOptions = {
        ...options,
        prompt: newQuestion,
      };
      const response = await openai.createCompletion(completeOptions);
      const pattern = /\d/;
      console.log(
        response.data.choices[0].text
          ?.split(/\n/)
          .filter((v) => pattern.test(v))
      );
    };
    generateResponse();
  };
  const onSubmit = (newQuestion: string) => {
    // openAiApiFunc(newQuestion);
    const pattern = /\d/;

    const ary = [
      "ください",
      "",
      "1. カレー粉を買う",
      "2. 鍋を温める",
      "3. 玉ねぎを切る",
      "4. 玉ねぎを鍋に入れて炒める",
      "5. スパイスを加える",
      "6. 牛肉を加えて炒める",
      "7. 牛乳を加える",
      "8. カレー粉を加えて煮込む",
      "9. 煮込んだカレーを皿に盛る",
      "10. トッピングをする",
    ].filter((v) => pattern.test(v));
    console.log(ary);
  };

  return { onSubmit };
};

export default useOpenAiApi;
