import * as React from 'react';

import * as styles from './modal.component.css';
import Backdrop    from './backdrop/backdrop.component';

interface PropTypes {
  children:    JSX.Element | string;
  show:        boolean;
  modalClosed: () => void;
}

class Modal extends React.Component<PropTypes, {}> {
  public shouldComponentUpdate(nextProps: PropTypes, nextState: {}): boolean {
    return nextProps.show !== this.props.show
      || nextProps.children !== this.props.children;
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0
          }}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
