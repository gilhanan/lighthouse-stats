import { LHR } from "../runs/models";

const VIEWER_ORIGIN = "https://googlechrome.github.io";

export function openLhrInClassicViewer(lhr: LHR) {
  window.addEventListener("message", function msgHandler(messageEvent) {
    if (messageEvent.origin !== VIEWER_ORIGIN) {
      return;
    }
    if (popup && messageEvent.data.opened) {
      popup.postMessage({ lhresults: lhr }, VIEWER_ORIGIN);
      window.removeEventListener("message", msgHandler);
    }
  });

  const { lighthouseVersion, requestedUrl, fetchTime } = lhr;
  const windowName = `${lighthouseVersion}-${requestedUrl}-${fetchTime}`;
  const popup = window.open(`${VIEWER_ORIGIN}/lighthouse/viewer`, windowName);
}

interface Props {
  lhr: LHR;
}

export const LhrViewerLink = ({ lhr }: Props) => {
  return (
    <button
      type="button"
      className="underline text-blue-500"
      onClick={() => openLhrInClassicViewer(lhr)}
    >
      View report
    </button>
  );
};
