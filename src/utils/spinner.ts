import ora from "ora";

// Create a singleton spinner instance
const spinner = ora();

export const createSpinner = (text: string) => {
  spinner.text = text;
  spinner.start();

  return {
    succeed: (text?: string) => {
      spinner.succeed(text);
    },
    fail: (text?: string) => {
      spinner.fail(text);
    },
    update: (text: string) => {
      spinner.text = text;
    },
    stop: () => {
      spinner.stop();
    },
  };
};
