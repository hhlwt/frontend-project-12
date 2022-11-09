const en = {
  translation: {
    logOutBtn: 'LogOut',
    notFound: 'Page not found',
    notFoundToHomeLink: 'But you can go <1>to the home page</1>',
    toastify: {
      addChannelFulfilled: '🤠 A new channel has been added!',
      deleteChannelFulfilled: '☠ The channel has been deleted!',
      renameChannelFulfilled: '✏ The channel has been renamed!',
      networkErr: '📡 Check your network connection',
    },
    authorization: {
      header: 'Log in',
      footer: 'Sign up',
      submit: 'Log in',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      invalidPassUsername: 'The username or password is incorrect',
    },
    signUp: {
      header: 'Sign up',
      footer: 'Log in',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      passwordConfirmationPlaceholder: 'Password confirmation',
      submit: 'Sign up',
      fieldIsRequired: 'Required',
      nameLength: 'Username must be 3 to 20 characters',
      passwordLength: 'Password must be at least 6 characters',
      passwordsMatch: 'Passwords must match',
      userExists: 'User already exists',
    },
    chat: {
      channelsHeader: 'Channels',
      messagesCounter: {
        count_one: '{{count}} message',
        count_other: '{{count}} messages',
      },
      inputPlaceholder: 'Enter a new message...',
      modalErrors: {
        nameExistsErr: 'Сhannel with this name already exists',
        nameLengthErr: 'Сhannel name must be 3 to 20 characters',
      },
      modalButtons: {
        cancel: 'Cancel',
        submit: 'Submit',
        delete: 'Delete',
      },
      addChannelModal: {
        header: 'Add channel',
        inputPlaceholder: 'Channel name',
      },
      deleteChannelModal: {
        triggerButton: 'Delete',
        header: 'Delete channel',
        body: 'Are you sure?',
      },
      renameChannelModal: {
        triggerButton: 'Rename',
        header: 'Rename channel',
        inputPlaceholder: 'Channel name',
      },
    },
  },
};

export default en;
