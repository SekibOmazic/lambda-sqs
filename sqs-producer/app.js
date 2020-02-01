const AWS = require("aws-sdk");
const { createMessages } = require("./util.js");

// AWS configuration
AWS.config.update({
  region: process.env.REGION
});

// SQS client
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const QUEUE_NAME = process.env.QUEUE_NAME;

const sendMessages = async () => {
  const messages = createMessages();
  return sqs
    .sendMessageBatch({
      Entries: messages,
      QueueUrl: QUEUE_NAME
    })
    .promise();
};

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - Lambda Output Object
 *
 */
exports.lambdaHandler = async (_event, _context) => {
  console.log(QUEUE_NAME);

  await sendMessages();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "sent 5 messages to SQS queue" }),
    headers: { "Content-Type": "application/json" }
  };
};
