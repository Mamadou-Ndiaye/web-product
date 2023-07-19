import {Component, computed, signal} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  increment(){
    this.counter.update((value)=>value+1);
  }
  decrement(){
    this.counter.update((value)=>value-1);
  }

}
