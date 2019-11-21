import React, { Component } from 'react';
import styles from './index.css';
import { Icon, Input, Button, Alert, message } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Action, Dispatch } from 'redux';
import { StateType } from '@/pages/model';
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';

const { Search } = Input;

interface IndexProps extends FormComponentProps {
  dispatch: Dispatch<Action<'index/post'>>;
  index: StateType;
}

// @ts-ignore
@connect(
  ({ index }: { index: StateType }) => ({ index }),
)
export default class Index extends Component <IndexProps> {

  render() {
    const { dispatch, index } = this.props;
    const { data } = index;

    return (
      <div className={styles.normal}>
        <div className={styles.wrapper}>
          <div className={styles.body}>
            <div className={styles.buttons}>
              <Search
                placeholder="请输入url地址"
                enterButton={<span><Icon type="switch"/> 生成短链</span>}
                size="large"
                type="primary"
                onSearch={(val: string) => {
                  dispatch({
                    type: 'index/post',
                    payload: {
                      url: val,
                    },
                  });
                }}
              />
            </div>
            {data && data.code && <div className={styles.messageSizeDemo} style={{ marginTop: 10 }}>
              <Alert
                message="短链"
                description={<div>
                  <code style={{ fontWeight: 600 }}>{data.short_uri}</code>
                  <CopyToClipboard text={data.short_uri}  onCopy={() => message.success("复制成功!")}>
                    <Button style={{ marginLeft: 20 }}><Icon type="copy"/> 复制</Button>
                  </CopyToClipboard>
                </div>}
                type="success"
                showIcon={true}
              />
            </div>}

          </div>
        </div>


      </div>
    );
  }
}
