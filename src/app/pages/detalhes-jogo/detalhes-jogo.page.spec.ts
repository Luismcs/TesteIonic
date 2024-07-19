import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesJogoPage } from './detalhes-jogo.page';

describe('DetalhesJogoPage', () => {
  let component: DetalhesJogoPage;
  let fixture: ComponentFixture<DetalhesJogoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesJogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
