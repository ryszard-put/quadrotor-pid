import { notification } from 'antd';
import { nanoid } from 'nanoid';

export const displayError = (message, description) => {
  const key = nanoid();
  console.log(key);
  notification.error({
    placement: 'topRight',
    duration: 6,
    message,
    description,
    key: key,
    onClick: () => {
      notification.close(key);
    },
  });
};

export const displaySuccess = (message, description) => {
  const key = nanoid();
  console.log(key);
  notification.success({
    placement: 'topRight',
    duration: 6,
    message,
    description,
    key: key,
    onClick: () => {
      notification.close(key);
    },
  });
};
