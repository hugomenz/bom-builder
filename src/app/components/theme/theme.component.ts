import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent {
  @Input()
  isDarkMode = false;

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    this.darkModeSwitched.emit(checked);
  }
}
