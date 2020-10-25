import React from "react";
import PropTypes from 'prop-types';
import { DialogItem } from './DialogItem';
import styles from './Dialogs.module.scss';

const Dialogs = ({ title }) => {
  const [dialogs, setDialogs] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/user/getFriends/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => setDialogs(data));
  }, []);
  console.log(dialogs);
  return (
    <div className={styles.Dialog}>
      {title && <h2>{title}</h2>}
      {Array.isArray(dialogs) && dialogs.length && dialogs.map((item) => {
        return <DialogItem key={item} dialog={item} />;
      })}
    </div>
  )
}

Dialogs.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.number),
}

Dialogs.defaultProps = {
  chats: [],
}

export default Dialogs;