import * as React from 'react';
import styles from './MyLinks.module.scss';
import { IMyLinksProps } from './IMyLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';


export default class MyLinks extends React.Component<IMyLinksProps, {}> {
  public render(): React.ReactElement<IMyLinksProps> {
    return (
      <div className={ styles.myLinks }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>My Personal Links!</span>
              {
                this.props.items.map(item => {
                  return <p className={ styles.description }>{item["Title"]}</p>;
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
