import { Component } from '@angular/core';

@Component({
  template: `<div class="container-fluid serverErrorPage">
  <app-nav></app-nav>
  <div class="container">
    <div class="row justify-content-md-center align-items-center">
      <div class="col col-sm-8 text-center">
        <h2 class="fw-bolder ">500 Server Internal Error</h2>
        <p class="fw-semibold ">Sunucu Hatası</p>
      </div>
    </div>
  </div>
</div>`,
styles:[
  `
    .serverErrorPage {
        background: #dee2e6;
        padding: 0;
        margin: 0;
        height: 100vh;
        .row {
          min-height: calc(100vh - 110px);
        }
      }
  `
]
})
export class UncaughtErrorComponent  { }
