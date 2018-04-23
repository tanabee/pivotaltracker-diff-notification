const request = require('request');
const diff = require('diff');
const secret = require('./secret.json');

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.pivotalDiffNotification = (req, res) => {

  var body = req.body;
  var message = '';
  var minimumMessage = body.message + ': <' + body.primary_resources[0].url + '|' + body.primary_resources[0].name +  '>';

  switch (body.kind) {
    case 'task_create_activity':
    case 'task_update_activity':
    case 'task_delete_activity':
      message = minimumMessage;
      break;
    case 'story_update_activity':
      if ('description' in body.changes[0].original_values) {
        var patch = diff
          .createPatch('test', body.changes[0].original_values.description, body.changes[0].new_values.description)
          .replace('Index: test\n===================================================================\n--- test\n+++ test\n', '')
          .replace('\\ No newline at end of file\n', '');
        message = minimumMessage + '\n```\n' + patch + '```';
      }
      break;
    default:
      break;
  }

  console.log(body);

  if (message === '') return;

  request.post({
    uri: secret.WEBHOOK_URL,
    headers: {
      'Content-type': 'application/json',
    },
    json: {
      'text': message
    }
  }, function(err, res, body) {
    console.log(err, res, body);
  });
};
