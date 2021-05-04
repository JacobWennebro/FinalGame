interface ListItem {
    address: string,
    next: ListItem
}

export default class LinkedList {
    tree: ListItem = null;

    queue(url: string) {
        const toAdd = { address: url, next: null };

        if(this.tree == null) {
            this.tree = toAdd;
        } else {
            let n: ListItem = this.tree;
            while(n.next != null) {
                n = n.next;
            }
            n.next = toAdd;
        }
    }

    dequeue() {
        if(!this.tree) return null;
        const temp = this.tree.address;
        this.tree = this.tree.next;
        return temp;
    }

    empty() {
        return this.tree == null;
    }

}