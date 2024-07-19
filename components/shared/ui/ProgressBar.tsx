interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progress = ((currentStep + 1) / totalSteps) * 100 + '%';

    return (
        <div className="absolute bottom-full left-0 h-1.5 bg-primary" style={{ width: progress }}></div>
    );
};

export default ProgressBar;
