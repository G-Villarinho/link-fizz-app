import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateLinkSucessModal } from "@/components/modals/create-link-sucess";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface Props {
  shortCode: string;
}

export function LinkSuccessEffect({ shortCode }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const initialModalState = location.state?.showModal ?? false;
  const [showModal, setShowModal] = useState(initialModalState);
  const [showConfetti, setShowConfetti] = useState(initialModalState);

  useEffect(() => {
    if (initialModalState) {
      navigate(location.pathname, { replace: true });

      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [initialModalState, navigate, location.pathname]);

  useEffect(() => {
    if (!showModal) {
      setShowConfetti(false);
    }
  }, [showModal]);

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <CreateLinkSucessModal
        isOpen={showModal}
        onOpenChange={setShowModal}
        shortCode={shortCode}
      />
    </>
  );
}
