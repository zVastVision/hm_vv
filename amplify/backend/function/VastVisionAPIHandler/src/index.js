
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const queueURL = process.env.SQS_QUEUE_URL
  const data = JSON.parse(event.body)
  const sqs = new SQSClient({ region: 'eu-west-2' })

  async function sendMessage(params, sqs) {
    const command = new SendMessageCommand(params)
    try {
      const res = await sqs.send(command)
      console.log("success")
      console.log(res)
    } catch (error) {
      console.log("error")
      console.log(error)
    }
  }

  for (const tag of data.tag_reads) {

    const params = {
      MessageGroupId: "UPDATE_ITEM",
      MessageBody: JSON.stringify({
        scannerName: data.reader_name,
        id: tag.epc,
        lastActive: tag.lastSeenTime
      }),
      QueueUrl: queueURL
    }
    await sendMessage(params, sqs)
  }

  return { statusCode: 200 }
};
