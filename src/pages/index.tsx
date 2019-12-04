import React, { Component } from 'react';
import styles from './index.css';
import { Icon, Input, Button, Alert, message, Row, Col } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Action, Dispatch } from 'redux';
import { StateType } from '@/pages/model';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'umi';

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
          <Row>
            <Col span={12} offset={6}>
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
                    <CopyToClipboard text={data.short_uri} onCopy={() => message.success('复制成功!')}>
                      <Button style={{ marginLeft: 20 }}><Icon type="copy"/> 复制</Button>
                    </CopyToClipboard>
                  </div>}
                  type="success"
                  showIcon={true}
                />
              </div>}</Col>


          </Row>

          <Row>
            <Col span={12} offset={6}>
              <div style={{ backgroundSize: 512, maxHeight: 640, marginTop: 20 }}>
                <a href={`https://cloud.tencent.com/act/cps/redirect?redirect=1052&cps_key=d7fa941b22714852fa704cc3e74e85a2&from=console`} target={`_blank`}>
                  <img src={require('../assets/tencent-1340.640.jpg')} alt={`热门云产品限量特惠秒杀，云服务器1核2G，99元/1年`} width="100%" height="100%"/>
                </a>
              </div>
            </Col>
          </Row>
        </div>


      </div>
    );
  }
}
