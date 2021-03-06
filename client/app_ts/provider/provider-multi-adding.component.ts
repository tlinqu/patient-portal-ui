import {Component, Input } from '@angular/core';
import {Provider} from "./provider";
import {ProviderService} from "./provider.service";

import { Response} from '@angular/http';

@Component({
    selector: 'c2s-provider-multi-adding',
    template:`<div class="col-sm-6 col-sm-push-6">
                    <div class="ibox panel panel-darkblue">
                        <div class="ibox-title modified panel-heading">
                            <h2 class="font-light">Selections to Add</h2>
                        </div>
                        <div class="panel-body">

                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <td></td>
                                            <th>Name/Facility</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr [hidden]="!(providers.length == 0)">
                                                <td>
                                                    <span class="sr-only">empty table cell</span>
                                                </td>
                                                <td>
                                                    <span>No Providers currently selected.</span>
                                                </td>
                                            </tr>
                                             <tr *ngFor="let provider of providers; let i = index">
                                                <td>
                                                    <button type="button" class="btn btn-xs btn-red">
                                                        <div class="fa fa-minus" (click)="enableDeleteProviderModal(provider)" >
                                                            <span class="sr-only">delete provider</span>
                                                            <span class="sr-only"></span>
                                                            <span class="sr-only"></span>
                                                        </div>
                                                    </button>
                                                </td>
                                                <td>
                                                    <span> {{provider | providerName}}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row m-b-sm">
                                <div class="col-sm-12">
                                    <button class="btn btn-sm btn-primary dark-green" (click)="toggleAddProviderModal()" [disabled]="(providers.length == 0)">Add to Provider List</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Add providers -->
                    <c2s-modal [(visible)]="showAddProviderModal">
                      <h1>Add Selected Providers</h1>
                          <div>
                            <strong>Are you sure you want to add the selected provider(s)?</strong>
                          </div>
                          <br/>
                      <button type="button" class="btn btn-white" (click)="toggleAddProviderModal()" class="btn">Cancel</button>
                      <button type="button" class="btn btn-primary dark-green" (click)="addProviders()" class="btn">Add Providers</button>
                    </c2s-modal>

                    <!-- Delete provider -->
                     <c2s-modal [(visible)]="showDeleteProviderModal">
                      <h1>Delete Provider</h1>
                          <div>
                            <strong>Are you sure you want to delete   {{selectedProvider | providerName}} ?</strong>
                          </div>
                          <br/>
                         <button type="button" class="btn btn-white" (click)="toggleDeleteProviderModal()" class="btn">Cancel</button>
                         <button type="button" class="btn btn-sm btn-primary dark-green" (click)="deleteProvider()" class="btn" >Delete</button>
                    </c2s-modal>
                </div>
                `,
})

export class ProviderMultiAddingComponent {
    showAddProviderModal = false;
    showDeleteProviderModal = false;

    @Input() providers: Provider[];
    selectedProvider:Provider = null;

    constructor(private providerService: ProviderService) {
    }

    addProviders(){
        if(this.providers){
            let selectedProvidersNPI = this.providerService.getNPIs(this.providers);
            this.showAddProviderModal = false;
            this.providerService.addProviders(selectedProvidersNPI)
                .subscribe(
                    this.success,
                    this.error,
                    () => console.log("Done!")
                );
        }
    }

    private success(res: Response) {
        this.selectedProvider = null;
        console.log(res);
        window.location.href = "fe/provider/list";
    }

    private error(res: Response) {
        console.error(res);
    }

    deleteProvider(){
        if(this.providers){
            this.providers.splice(this.providers.indexOf(this.selectedProvider), 1);
            this.toggleDeleteProviderModal();
        }
    }

    toggleAddProviderModal(){
        this.showAddProviderModal = !this.showAddProviderModal;
    }

    toggleDeleteProviderModal(){
        this.showDeleteProviderModal = !this.showDeleteProviderModal;
    }
    enableDeleteProviderModal(provider:Provider){
        this.selectedProvider = provider;
        this.toggleDeleteProviderModal();
    }

}