import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

import * as strings from 'ButtonWebPartStrings';
import Button from './components/Button';
import { IButtonProps } from './components/IButtonProps';
import { LinkTarget } from './IButtoninfo';

export interface IButtonWebPartProps {
  description: string;
  collectionData: any[];
  color: string;
}

export default class ButtonWebPart extends BaseClientSideWebPart<IButtonWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IButtonProps> = React.createElement(
      Button,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        collectionData: this.properties.collectionData,
        color: this.properties.color
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "Colleccíon de Botones",
                  panelHeader: "Botones Solidario",
                  manageBtnLabel: "¡Configurar la información aquí!",
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "Titulo",
                      title: "Titulo del boton",
                      type: CustomCollectionFieldType.string
                    },
                    {
                      id: "url",
                      title: "URLs Destino",
                      type: CustomCollectionFieldType.string
                    },
                    /* {
                      id: "img",
                      title: "URLs Imagen",
                      type: CustomCollectionFieldType.string
                    }, */
                    {
                      id: 'target',
                      title: 'Pestaña',
                      type: CustomCollectionFieldType.dropdown,
                      options: [
                        {
                          key: LinkTarget.parent,
                          text: 'Misma Página'
                        },
                        {
                          key: LinkTarget.blank,
                          text: 'Nueva Página'
                        }
                      ]
                    },
                    {
                      id: "Color",
                      title: "Color",
                      type: CustomCollectionFieldType.color
                    }
                    ,
                    {
                      id: "ColorTxt",
                      title: "Color txt",
                      type: CustomCollectionFieldType.color
                    }
                  ],
                  disabled: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
