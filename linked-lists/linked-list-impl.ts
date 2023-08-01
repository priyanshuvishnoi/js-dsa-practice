class NodeItem<T> {
  value: T;
  next: NodeItem<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  private head: NodeItem<T> | null;
  private tail: NodeItem<T> | null;
  private length: number = 0;

  constructor(value: T) {
    const newNode = new NodeItem(value);
    this.head = newNode;
    this.tail = this.head;
    this.length = 1;
  }

  printList() {
    let temp = this.head;
    while (temp !== null) {
      console.log(temp.value);
      temp = temp.next;
    }
  }

  getHead() {
    if (this.head === null) {
      console.log('Head: null');
    } else {
      console.log('Head: ' + this.head.value);
    }
  }

  getTail() {
    if (this.tail === null) {
      console.log('Tail: null');
    } else {
      console.log('Tail: ' + this.tail.value);
    }
  }

  getLength() {
    console.log('Length: ' + this.length);
  }

  makeEmpty() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: T) {
    const newNode = new NodeItem(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
    return this;
  }

  pop() {
    if (this.length === 0) {
      return undefined;
    }

    let pre = this.head;
    let temp = this.head;

    while (temp !== this.tail) {
      pre = temp;
      temp = temp!.next;
    }

    this.tail = pre;
    this.tail!.next = null;
    this.length -= 1;
    if (this.length === 0) {
      this.head = this.tail = null;
    }
    return temp;
  }

  unshift(value) {
    const newNode = new NodeItem(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  shift() {
    if (!this.head) return null;

    const temp = this.head;
    this.head = this.head.next;

    this.length--;
    if (this.length === 0) {
      this.head = this.tail = null;
    }
    return temp;
  }

  get(index) {
    if (index < 0 || index > this.length || index === this.length) {
      return null;
    }

    let temp = this.head;
    let n = 0;

    while (n !== index && temp) {
      temp = temp.next;
      n++;
    }

    return temp;
  }

  set(index, value) {
    const node = this.get(index);
    if (node) {
      node.value = value;
    }
    return !!node;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      return false;
    }

    if (index === this.length) {
      return this.push(value);
    }

    if (index === 0) {
      return this.unshift(value);
    }

    const newNode = new NodeItem(value);
    const prevNode = this.get(index - 1);

    newNode.next = prevNode!.next;
    prevNode!.next = newNode;
    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    if (index === 0) {
      return this.shift();
    }

    if (index === this.length - 1) {
      return this.pop();
    }

    const prevNode = this.get(index - 1);
    const temp = prevNode?.next;
    prevNode!.next = prevNode!.next!.next;
    this.length--;
    return temp;
  }

  reverse() {
    let prev = this.tail;
    let current = this.head;
    let next: NodeItem<T> | null = null;
    this.tail = this.head;

    while (current != null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }
}
