import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogListComponent } from './catalog-list.component';

describe('CatalogListComponent', () => {
  let component: CatalogListComponent;
  let fixture: ComponentFixture<CatalogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
