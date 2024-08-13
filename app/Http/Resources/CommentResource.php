<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'post_id' => $this->post_id,
            'message' => $this->message,
            'email' => $this->maskedEmail($this->email),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }

    /**
     * Mask the email address.
     *
     * @param string $email
     * @return string
     */
    protected function maskedEmail(string $email): string
    {
        $emailParts = explode('@', $email);
        $emailName = substr($emailParts[0], 0, 2) . '...' . substr($emailParts[0], -1);
        $domainParts = explode('.', $emailParts[1]);
        $domainName = substr($domainParts[0], 0, 1) . '...' . substr($domainParts[0], -1);
        $domainExtension = $domainParts[1];

        return $emailName . '@' . $domainName . '.' . $domainExtension;
    }
}
