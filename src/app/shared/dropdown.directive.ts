import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from "@angular/core";


@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  isOpen = false;
  openedElement: ElementRef<any> = new ElementRef<any>(null);
  constructor(private el: ElementRef,
              private renderer: Renderer2 ,
            ) {}
            // tell the dom to change 'aria-expanded' to true when the collapsed navbar opened.
  @HostBinding('attr.aria-expanded') expanded = false;
  @HostListener('document:click' , ['$event']) open(event: Event) {
    //Tell the Dom where to add the 'show' class for bootstrap to open the collapsed navbar.
    let nextElement = this.el.nativeElement.nextElementSibling;
    //only open when clicked on the open element.
    //this.el.nativeElement is where the directive declared.
    if (!this.isOpen && this.el.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen;
      this.expanded = true;
      this.renderer.addClass(nextElement, "show"); // add the class show to show the navbar
      //save the location on dom, that way less complicated code needed to find the element location to close when ui changes.
      this.openedElement = nextElement;
    }
   //close on click
    else {
      if (this.isOpen && !this.el.nativeElement.nextElementSibling.contains(event.target)) {
        this.renderer.removeClass(this.openedElement, "show");// remove the class show to hide the navbar
        this.isOpen = !this.isOpen;
        this.expanded = false;
      }
    }
    }
}
