'use client';
import React, { useState } from 'react';
import { Form, Button, TextField, Label, Input, Description, FieldError, TextArea } from '@heroui/react';
import { Paperclip, Globe, ArrowRight } from '@gravity-ui/icons';
import { submitApplication } from '@/lib/api/core/applications';




const JobApply = ({ job, applicant }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeLink, setResumeLink] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit =async (e) => {
    e.preventDefault();
    const currentErrors = {};
    
    // Validation: Resume Link is required
    if (!resumeLink.trim()) {
      currentErrors.resume = 'Please provide a valid link to your resume.';
    }

    // Validation: Portfolio Link is required
    if (!portfolioLink.trim()) {
      currentErrors.portfolio = 'Please provide a valid link to your portfolio.';
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Form submission payload
    const formData =  {
      jobId: job?._id,
      title: job?.title,
      applicantName: applicant?.name,
      applicantId: applicant?.id,
      applicantEmail: applicant?.email,
      CompanyPage: job?.companyName,
      status: 'applied',
      resumeLink,
      portfolioLink,
      additionalInfo: e.target.additionalInfo?.value || '',
    };

    // console.log('Submitting Application:', formData);
    const res = await submitApplication(formData);

    if(res.insertedId) {
      
      setResumeLink('');
      setPortfolioLink('');
      additionalInfo.value = '';

    }



    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Application submitted successfully!');
    }, 1500);


  };

  const handleReset = () => {
    setResumeLink('');
    setPortfolioLink('');
    setErrors({});
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
      {/* Header Section */}
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Job Application</span>
        <h2 className="text-2xl font-bold mt-1 text-zinc-900 dark:text-zinc-50">
          Apply for {job?.title || 'this position'}
        </h2>
        {applicant?.name && (
          <p className="text-sm text-zinc-500 mt-1">
            Applying as: <span className="font-medium text-zinc-700 dark:text-zinc-300">{applicant.name}</span>
          </p>
        )}
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800 mb-6" />

      {/* HeroUI Form */}
      <Form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        
        {/* Resume Link Field (Required) */}
        <TextField isInvalid={!!errors.resume} className="w-full">
          <Label className="text-sm font-semibold flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
            <Paperclip className="w-4 h-4 text-zinc-500" /> Resume Link <span className="text-danger">*</span>
          </Label>
          <Input 
            name="resumeLink"
            type="url"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            placeholder="e.g., https://drive.google.com/file/d/... or github.com/..." 
            className="w-full mt-1.5"
          />
          <Description className="text-xs text-zinc-400 mt-1">
            Provide a shared link to your PDF resume (Google Drive, Dropbox, Notion, etc.)
          </Description>
          {errors.resume && <FieldError className="text-xs text-danger mt-1">{errors.resume}</FieldError>}
        </TextField>

        {/* Portfolio Link Field (Required) */}
        <TextField isInvalid={!!errors.portfolio} className="w-full">
          <Label className="text-sm font-semibold flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
            <Globe className="w-4 h-4 text-zinc-500" /> Portfolio Link <span className="text-danger">*</span>
          </Label>
          <Input 
            name="portfolioLink"
            type="url"
            value={portfolioLink}
            onChange={(e) => setPortfolioLink(e.target.value)}
            placeholder="e.g., https://yourportfolio.com or behance.net/..." 
            className="w-full mt-1.5"
          />
          <Description className="text-xs text-zinc-400 mt-1">
            Provide a link to your personal website, GitHub profile, or online design deck.
          </Description>
          {errors.portfolio && <FieldError className="text-xs text-danger mt-1">{errors.portfolio}</FieldError>}
        </TextField>

        {/* Optional Additional Information Field */}
        <div className="w-full flex flex-col">
          <label htmlFor="additionalInfo" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
            Cover Note / Additional Information <span className="text-xs text-zinc-400 font-normal">(Optional)</span>
          </label>
          <TextArea
            id="additionalInfo"
            name="additionalInfo"
            aria-label="Additional application notes"
            className="h-32 w-full text-sm"
            placeholder="Tell the hiring team anything else you'd like them to know..."
          />
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button 
            type="reset" 
            variant="flat" 
            color="default"
            className="font-medium"
            onClick={handleReset}
          >
            Clear Form
          </Button>
          
          <Button 
            type="submit" 
            color="primary" 
            className="font-semibold shadow-md shadow-primary/20 flex items-center gap-2"
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : (
              <>
                Submit Application <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobApply;