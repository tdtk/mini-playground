import React, { useEffect, useState } from 'react';
import './App.css';
import { PuppyVM } from '@playpuppy/puppy2d';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { PuppyEditor } from '@playpuppy/puppy-editor';
import { ThankYouMrTada } from '@playpuppy/koinu';
import { messagefy } from '@playpuppy/puppy2d/dist/lang/message';
import { SourceEvent } from '@playpuppy/puppy2d/dist/lang/code';

function App() {
  const [puppy, setPuppy] = useState(null as PuppyVM | null);
  const [editor, setEditor] = useState(null as PuppyEditor | null);
  useEffect(() => {
    const puppyElement = document.getElementById('puppy-screen');
    if (puppyElement) {
      const puppy = new PuppyVM(puppyElement);
      setPuppy(puppy);
    }
    const editorElement = document.getElementById('puppy-editor');
    if (editorElement) {
      const editor = new PuppyEditor(editorElement, {
        puppyCodeAction: {
          koinuCodeAction:  (s) => {
            return ThankYouMrTada(s)
          }
        },
        messagefy: (log: any) => messagefy(log as SourceEvent)
      });
      editor.setModel("print('Hello')", "python");
      setEditor(editor);
    }
  }, []);
  
  useEffect(() => {
    if(puppy && editor) {
      puppy.addEventListener('error', editor.addSourceEvent.bind(editor));
      puppy.addEventListener('warning', editor.addSourceEvent.bind(editor));
      puppy.addEventListener('info', editor.addSourceEvent.bind(editor));
      editor.callback = (source: string) => puppy.load(source, false)
    }
  }, [puppy, editor])

  return (
    <div className="App">
      <Container style={{maxWidth: "100vw", height: "100vh", margin: "0", padding: "0"}}>
        <Row style={{width: "100%", height: "100%"}}>
          <Col>
            <div
              id="puppy-screen"
              style={{width: "100%", height: "100%"}}
            >
            </div>
            <div style={{width: "100%", textAlign: "right", position: "absolute", bottom: "12px", right: "20px"}}>
              <Button
                onClick={() => puppy ? puppy.load(editor?.editor.getValue(), true) : false}
              >
                Play
              </Button>
            </div>
          </Col>
          <Col>
            <div
              id="puppy-editor"
              style={{width: "100%", height: "100%", textAlign: "left"}}
            >
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
