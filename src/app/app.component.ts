import { Component } from '@angular/core';


function scan() {
  const ndef = new NDEFReader();
  ndef.scan().then(() => {
    console.log("Scan started successfully.");
    ndef.onreadingerror = () => {
      console.log("Cannot read data from the NFC tag. Try another one?");
    };
    ndef.onreading = (event: any) => {
      console.log("NDEF message read.");
    };
  }).catch((error: any) => {
    console.log(`Error! Scan failed to start: ${error}.`);
  });
}

function writeMsg(){
  const ndef = new NDEFReader();
  ndef.write("Hello World"
    ).then(() => {
      console.log("Message written.");
    }).catch(error => {
      console.log(`Write failed :-( try again: ${error}.`);
    });
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-nfc';

  public Scan(){
    scan();
  }

  public write(){
    writeMsg();
  }

}

interface Window {
  NDEFMessage: NDEFMessage
}
declare class NDEFMessage {
  constructor(messageInit: NDEFMessageInit)
  records: ReadonlyArray<NDEFRecord>
}
declare interface NDEFMessageInit {
  records: NDEFRecordInit[]
}

declare type NDEFRecordDataSource = string | BufferSource | NDEFMessageInit

interface Window {
  NDEFRecord: NDEFRecord
}
declare class NDEFRecord {
  constructor(recordInit: NDEFRecordInit)
  readonly recordType: string
  readonly mediaType?: string
  readonly id?: string
  readonly data?: DataView
  readonly encoding?: string
  readonly lang?: string
  toRecords?: () => NDEFRecord[]
}
declare interface NDEFRecordInit {
  recordType: string
  mediaType?: string
  id?: string
  encoding?: string
  lang?: string
  data?: NDEFRecordDataSource
}

declare type NDEFMessageSource = string | BufferSource | NDEFMessageInit

interface Window {
  NDEFReader: NDEFReader
}
declare class NDEFReader extends EventTarget {
  constructor()
  onreading: (this: this, event: NDEFReadingEvent) => any
  onreadingerror: (this: this, error: Event) => any
  scan: (options?: NDEFScanOptions) => Promise<void>
  write: (
    message: NDEFMessageSource,
    options?: NDEFWriteOptions
  ) => Promise<void>
  makeReadOnly: (options?: NDEFMakeReadOnlyOptions) => Promise<void>
}

interface Window {
  NDEFReadingEvent: NDEFReadingEvent
}
declare class NDEFReadingEvent extends Event {
  constructor(type: string, readingEventInitDict: NDEFReadingEventInit)
  serialNumber: string
  message: NDEFMessage
}
interface NDEFReadingEventInit extends EventInit {
  serialNumber?: string
  message: NDEFMessageInit
}

interface NDEFWriteOptions {
  overwrite?: boolean
  signal?: AbortSignal
}
interface NDEFMakeReadOnlyOptions {
  signal?: AbortSignal
}
interface NDEFScanOptions {
  signal: AbortSignal
}
