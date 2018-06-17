import * as React from 'react';
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError
} from 'axios';

import Modal from '../ui/modal/modal.component';

interface State {
  error:               AxiosError;
  requestInterceptor:  number;
  responseInterceptor: number;
}

const WithErrorHandler = (Component: React.ComponentClass, instance: AxiosInstance): React.ComponentClass => {
  return class extends React.Component<any, State> {
    public state: State = {
      error:               null,
      requestInterceptor:  null,
      responseInterceptor: null
    };

    public componentWillMount(): void {
      this.state.requestInterceptor = instance.interceptors.request.use(
        (req: AxiosRequestConfig) => {
          this.setState({ error: null });
          return req;
        },
        (error: AxiosError) => this.setState({ error }));

      this.state.responseInterceptor = instance.interceptors.response.use(
        (res:   AxiosResponse) => res,
        (error: AxiosError) => this.setState({ error }));
    };

    public componentWillUnmount(): void {
      axios.interceptors.request.eject(this.state.requestInterceptor);
      axios.interceptors.response.eject(this.state.responseInterceptor);
    };

    public errorConfirmedHandler = (): void => this.setState({ error: null });

    public render(): JSX.Element {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error ? true : false}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error && this.state.error.message}
          </Modal>
          <Component {...this.props} />
        </React.Fragment>
      );
    }
  }
};

export default WithErrorHandler;
