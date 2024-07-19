interface StepperCountProps {
    currentStep: number;
    totalSteps: number;
}

const StepperCount: React.FC<StepperCountProps> = ({ currentStep, totalSteps }) => {
    const stepperCount = `${currentStep + 1}/${totalSteps}`

    return (
        <div>{stepperCount}</div>
    );
};

export default StepperCount;
