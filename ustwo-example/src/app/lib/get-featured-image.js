import get from 'lodash/get';
import find from 'lodash/find';

export default (data, attachments) => {
  if (!attachments) {
    attachments = get(data, '_embedded.wp:attachment', []);
  }
  return find(attachments, 'id', get(data, 'featured_image'));
};
