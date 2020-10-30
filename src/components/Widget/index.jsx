import React from 'react';
import { Dialogs } from '../index';
import styles from './Widget.module.scss';
import { ReactComponent as Message } from "./email.svg";

const Widget = () => {
  const [active, setActive] = React.useState(false);

  return (
    <div className={styles.WidgetComponent}>
      {active && (
        <div className={styles.WidgetContent}>
          <div className={styles.WidgetHeader}>
            <h2>Чаты</h2>
          </div>
          <div className={styles.WidgetBody}>
            <Dialogs onClick={() => setActive(false)} />
          </div>
        </div>
      )}
      <div className={styles.WidgetButton} onClick={() => setActive(!active)}>
        <div>
          <Message />
        </div>
      </div>
    </div>
  );
};

export default Widget;