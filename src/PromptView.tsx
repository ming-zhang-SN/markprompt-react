import React, {
  useMemo,
  type ReactElement,
  type KeyboardEventHandler,
  useCallback,
} from "react";

import { Answer } from "./Answer.js";
import { DEFAULT_MARKPROMPT_OPTIONS } from "./constants.js";
import { MarkpromptForm } from "./MarkpromptForm.js";
import * as BaseMarkprompt from "./primitives/headless.js";
import { References } from "./References.js";
import { type MarkpromptOptions } from "./types.js";

interface PromptViewProps {
  prompt: MarkpromptOptions["prompt"];
  references: MarkpromptOptions["references"];
  close?: MarkpromptOptions["close"];
  onDidSelectReference?: () => void;
}

export function PromptView(props: PromptViewProps): ReactElement {
  const { prompt, references, close, onDidSelectReference } = props;

  return (
    <div className="MarkpromptPromptView">
      <MarkpromptForm
        label={
          prompt?.label !== undefined && prompt?.label != null
            ? prompt?.label
            : DEFAULT_MARKPROMPT_OPTIONS.prompt!.label!
        }
        placeholder={
          prompt?.placeholder !== undefined && prompt?.placeholder != null
            ? prompt?.placeholder
            : DEFAULT_MARKPROMPT_OPTIONS.prompt!.placeholder!
        }
        icon="prompt"
        close={close}
      />

      <AnswerContainer
        references={references}
        onDidSelectReference={onDidSelectReference}
      />
    </div>
  );
}

interface AnswerContainerProps {
  references: MarkpromptOptions["references"];
  onDidSelectReference?: () => void;
}

function AnswerContainer({
  references,
  onDidSelectReference,
}: AnswerContainerProps): ReactElement {
  return (
    <div className="MarkpromptAnswerContainer">
      <BaseMarkprompt.AutoScroller className="MarkpromptAutoScroller">
        <Answer />
      </BaseMarkprompt.AutoScroller>

      <References
        loadingText={references?.loadingText}
        transformReferenceId={references?.transformReferenceId}
        getLabel={references?.getLabel}
        getHref={references?.getHref}
        onDidSelectReference={onDidSelectReference}
      />
    </div>
  );
}
