import React, { useState } from 'react';
import { FormSection } from '../ui/FormSection';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { RichTextArea } from '../ui/RichTextArea';

export function FormSectionDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: ''
  });

  const roles = [
    { value: '', label: 'Select role' },
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Form Section</h2>
        <p className="text-gray-600 mb-6">
          Reusable form sections with consistent title and description styling.
        </p>
      </div>

      <div className="space-y-8">
        <FormSection 
          title="Basic Information"
          description="Enter your basic details below."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your name"
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
            />
          </div>
        </FormSection>

        <FormSection 
          title="Role & Permissions"
          description="Select your role and access level. This determines what features you can access."
        >
          <Select
            label="Role"
            options={roles}
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          />
        </FormSection>

        <FormSection 
          title="Profile"
          description="Tell us about yourself. This information will be displayed on your profile."
        >
          <RichTextArea
            label="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            placeholder="Write a brief bio about yourself..."
            showGenerateButton={true}
            onGenerate={() => console.log('Generate bio')}
          />
        </FormSection>

        <FormSection title="Actions">
          <div className="flex gap-4">
            <Button type="submit">
              Save Changes
            </Button>
            <Button variant="outline">
              Cancel
            </Button>
          </div>
        </FormSection>

        <FormSection 
          title="Section without Description"
        >
          <p className="text-gray-600">
            This section demonstrates a FormSection without a description prop.
          </p>
        </FormSection>
      </div>
    </div>
  );
}