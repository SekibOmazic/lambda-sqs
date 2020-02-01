const uuid = require("uuid/v4");

exports.createMessages = () => {
  const groupId = `Message-Group-${uuid()}`;
  return [...Array(5).keys()].map(_ => ({
    Id: uuid(),
    MessageBody: JSON.stringify({ orderId: uuid(), date: new Date() }),
    MessageGroupId: groupId,
    MessageDeduplicationId: uuid(),
    MessageAttributes: {
      attr1: {
        DataType: "String",
        StringValue: "Message attribute 1"
      },
      attr2: {
        DataType: "String",
        StringValue: "Message attribute 2"
      }
    }
  }));
};
