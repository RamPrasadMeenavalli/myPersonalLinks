import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
} from '@microsoft/sp-webpart-base';

import MyLinks from './components/MyLinks';
import { IMyLinksProps } from './components/IMyLinksProps';
import {sp} from '@pnp/sp/presets/all';

export interface IMyLinksWebPartProps {
  description: string;
}

export default class MyLinksWebPart extends BaseClientSideWebPart<IMyLinksWebPartProps> {

  private _links:Array<any>;

  protected async onInit(): Promise<void> {
    sp.setup({spfxContext:this.context});
    this._links = await this._getPersonalLinks(false);
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IMyLinksProps > = React.createElement(
      MyLinks,
      {
        items: this._links
      }
    );

    ReactDom.render(element, this.domElement);
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
      ]
    };
  }

  private _getPersonalLinks = (filterByEmail:boolean):Promise<Array<any>> => {

    // This legacyPageContext is not recommended to be used.
    console.log(this.context.pageContext.legacyPageContext.userId);

    if(filterByEmail)
    {
      // Filter by EMail
      return sp.web.lists.getByTitle('Personal Links').items
      .filter(`Author/EMail eq '${encodeURIComponent(this.context.pageContext.user.email)}'`)
      .select('Title')
      .get();
    }
    else
    {
      //Filter by LoginName (i:0#.f|membership|r@tenant-name.onmicrosoft.com)
      let userToken = `i:0#.f|membership|${this.context.pageContext.user.loginName}`;
      return sp.web.lists.getByTitle('Personal Links').items
      .filter(`Author/Name eq '${encodeURIComponent(userToken)}'`)
      .select('Title')
      .get();
    }

    sp.web.currentUser.get().then(user => {
      // Query for the list items using user.Id
      // sp.web.lists.......
    });
  }
}
