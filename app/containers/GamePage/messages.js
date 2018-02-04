import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'Gameapp.Containers.GamePage.Header',
    defaultMessage: 'Enter a number',
  },
  placeholderNumber: {
    id: 'Gameapp.Containers.GamePage.Placeholder.Number',
    defaultMessage: 'Number',
  },
  attempts: {
    id: 'Gameapp.Containers.GamePage.Attempts',
    defaultMessage: 'Choose a number between 0 and 100. You have {attempts} attemps left'
  },
  success: {
    id: 'Gameapp.Containers.GamePage.Success',
    defaultMessage: 'Congratulations you find the number'
  },
  save: {
    id: 'Gameapp.Containers.GamePage.Save',
    defaultMessage: 'Save',
  }
});
