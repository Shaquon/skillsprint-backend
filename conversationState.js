const conversationStates = {
  TITLE: "TITLE",
  DESCRIPTION: "DESCRIPTION",
  LANGUAGE: "LANGUAGE",
  // ... other states
};

let currentState = conversationStates.TITLE;
const ticketInfo = {};

function processUserResponse(userResponse) {
  switch (currentState) {
    case conversationStates.TITLE:
      if (isValidTitle(userResponse)) {
        ticketInfo.title = userResponse;
        currentState = conversationStates.DESCRIPTION;
        return "Great! Now, please provide a detailed description of your problem.";
      } else {
        return "Please provide a valid title for your ticket.";
      }
    case conversationStates.DESCRIPTION:
      if (isValidDescription(userResponse)) {
        ticketInfo.description = userResponse;
        currentState = conversationStates.LANGUAGE;
        return "Thanks for the description. What programming language are you working with?";
      } else {
        return "Please provide a more detailed description of your problem.";
      }
    // ... handle other states
    default:
      return "Sorry, something went wrong. Please start over.";
  }
}
