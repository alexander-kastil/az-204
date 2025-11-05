import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogContainerComponent } from './catalog-container.component';

describe('CatalogContainerComponent', () => {
  let component: CatalogContainerComponent;
  let fixture: ComponentFixture<CatalogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
