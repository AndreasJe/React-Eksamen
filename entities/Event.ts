export class Event {

    constructor(
        public title: string, 
        public imgUrl: string, 
        public group: string, 
        public timeStart: string, 
        public timeEnd: string, 
        public dateStart: string, 
        public dateEnd: string, 
        public location: string, 
        public description: string, 
        public id?: string) {

    }
}
