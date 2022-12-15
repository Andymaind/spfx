import * as React from 'react';
import styles from './Button.module.scss';
import { IButtonProps } from './IButtonProps';


export default class Button extends React.Component<IButtonProps, {}> {
  public render(): React.ReactElement<IButtonProps> {
    const {
      collectionData
    } = this.props;

    return (
      <div className={styles.button}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              {this.props.collectionData ?
                this.props.collectionData && this.props.collectionData.map((e) => {
                  return (
                      <button className={styles['button-17']} style={{ backgroundColor: e.Color}}>
                          <a  style={ {color: e.ColorTxt} } className={styles.links} href={e.url} target={e.target}>{e.Titulo}</a>
                      </button>
                  );
                }
                )
                :
                <span>Quiero ser un boton</span>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
