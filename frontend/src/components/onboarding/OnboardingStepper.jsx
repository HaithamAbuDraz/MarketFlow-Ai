import React from 'react';

const STEP_TITLES = [
  'Welcome',
  'Store Setup',
  'Business Info',
  'Store Preferences',
  'Ready',
];

export const OnboardingStepper = ({ currentStep = 1, totalSteps = 5 }) => {
  const currentTitle = STEP_TITLES[currentStep - 1] || 'Welcome';

  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-6 py-6 shrink-0">
      <div className="w-full max-w-[560px] flex flex-col gap-3">
        {/* Step Indicator and Title */}
        <div className="flex items-center justify-between text-sm leading-normal">
          <span className="font-semibold text-[#2563eb] uppercase tracking-wider text-[13px] sm:text-[14px]">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="font-medium text-[#64748b] text-[13px] sm:text-[14px]">
            {currentTitle}
          </span>
        </div>

        {/* 5-segment progress bar */}
        <div className="flex gap-2 w-full">
          {Array.from({ length: totalSteps }, (_, i) => {
            const stepNum = i + 1;
            const isCompletedOrActive = stepNum <= currentStep;

            return (
              <div
                key={stepNum}
                className={`flex-1 h-[6px] rounded-[3px] transition-all duration-300 ${
                  isCompletedOrActive
                    ? 'bg-[#2563eb]'
                    : 'bg-[#e2e8f0]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStepper;
